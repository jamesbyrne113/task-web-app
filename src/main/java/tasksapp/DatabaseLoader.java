package tasksapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tasksapp.board.Board;
import tasksapp.board.BoardRepository;
import tasksapp.tasklists.TaskList;
import tasksapp.tasklists.TaskListRepository;
import tasksapp.tasks.Task;
import tasksapp.tasks.TaskRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {
	private final TaskRepository taskRepository;
	private final TaskListRepository taskListRepository;
	private final BoardRepository boardRepository;

	@Autowired
	public DatabaseLoader(TaskRepository taskRepository, TaskListRepository taskListRepository, BoardRepository boardRepository) {
		this.taskRepository = taskRepository;
		this.taskListRepository = taskListRepository;
		this.boardRepository = boardRepository;
	}

	@Override
	public void run(String... run) {
		Board board = this.boardRepository.save(new Board("Board"));
		TaskList taskList1 = this.taskListRepository.save(new TaskList("TO DO", board));


		TaskList taskList2 = this.taskListRepository.save(new TaskList("Groceries", board));

		Task task1 = this.taskRepository.save(new Task(false, "Look for jobs", "on linkedin", taskList1));
		Task task2 = this.taskRepository.save(new Task(false, "Petrol", "check points", taskList1));


		Task task3 = this.taskRepository.save(new Task(false, "Milk", "semi skimmed", taskList2));
		Task task4 = this.taskRepository.save(new Task(false, "Bread", "white", taskList2));
	}
}
