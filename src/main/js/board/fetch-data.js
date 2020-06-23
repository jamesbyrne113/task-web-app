import axios from "../axios";
import promise from "promise";

function getTasks(taskList) {
    return axios.get(taskList._links.tasks.href)
        .then(response => {
            return promise.all(response.data._embedded.tasks.map(task =>
                axios.get(task._links.self.href)
            ));
        }).then(responses => {
            return responses.map(response => {
                const task = response.data;
                task.etag = response.headers.etag;
                return task;
            });
        }).catch(e => {
            console.log(e);
        });
}

function getTaskLists(taskListsLink, setTaskListsLinks) {
    return axios.get(taskListsLink)
        .then(response => {
            setTaskListsLinks(response.data._links);
            return promise.all(response.data._embedded.taskLists.map(taskList =>
                axios.get(taskList._links.self.href)
            ));
        }).then(responses => {
            return responses.map(response => {
                const taskList = response.data;
                taskList.tasks = [];
                return taskList;
            });
        }).then(responseTaskLists => {
            return promise.all(responseTaskLists.map(taskList => {
                return getTasks(taskList)
                    .then(tasks => {
                        taskList.tasks = tasks;
                        return taskList;
                    });
            }));
        }).catch(e => {
            console.log(e);
        });
}

function fetchBoard(setBoard, setTaskLists, setTaskListsLinks) {
    axios.get("/boards")
        .then(response => {
            return axios.get(response.data._embedded.boards[0]._links.self.href);
        }).then(response => {
        const newBoard = response.data;
        newBoard.etag = response.headers.etag;
        newBoard.taskLists = [];
        setBoard(newBoard);

        getTaskLists(newBoard._links.taskLists.href, setTaskListsLinks)
            .then(newTaskLists => {
                setTaskLists(newTaskLists);
                return newBoard;
            }).catch(e => {
            console.log(e);
        });
    }).catch(e => {
        console.log(e);
    });
}

export default function fetchBoardGenerator(setBoard, setTaskLists, setTaskListsLinks) {
    return () => {fetchBoard(setBoard, setTaskLists, setTaskListsLinks)}
}