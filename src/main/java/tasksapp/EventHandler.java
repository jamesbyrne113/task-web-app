package tasksapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import tasksapp.tasklists.TaskList;
import tasksapp.tasks.Task;

import static tasksapp.WebSocketConfiguration.MESSAGE_PREFIX;

@Component
@RepositoryEventHandler
public class EventHandler {
	private final SimpMessagingTemplate websocket;
	private final EntityLinks entityLinks;

	@Autowired
	public EventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
		this.websocket = websocket;
		this.entityLinks = entityLinks;
	}

	@HandleAfterCreate
	public void newTask(Task task) {
		this.websocket.convertAndSend(MESSAGE_PREFIX + "/newTask", getPath(task));
	}

	@HandleAfterDelete
	public void deleteTask(Task task) {
		this.websocket.convertAndSend(MESSAGE_PREFIX + "/deleteTask", getPath(task));
	}

	@HandleAfterSave
	public void updateTask(Task task) {
		this.websocket.convertAndSend(MESSAGE_PREFIX + "/updateTask", getPath(task));
	}

	@HandleAfterCreate
	public void newTaskList(TaskList taskList) { this.websocket.convertAndSend(MESSAGE_PREFIX + "/newTaskList", getPath(taskList));}

	@HandleAfterDelete
	public void deleteTaskList(TaskList taskList) { this.websocket.convertAndSend(MESSAGE_PREFIX + "/deleteTaskList", getPath(taskList));}

	@HandleAfterSave
	public void updateTaskList(TaskList taskList) { this.websocket.convertAndSend(MESSAGE_PREFIX + "/updateTaskList", getPath(taskList));}

	public String getPath(TaskList tasklist) {
		return this.entityLinks.linkForItemResource(tasklist.getClass(), tasklist.getId()).toUri().getPath();
	}

	public String getPath(Task task) {
		return this.entityLinks.linkForItemResource(task.getClass(), task.getId()).toUri().getPath();
	}
}
