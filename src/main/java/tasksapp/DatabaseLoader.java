package tasksapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tasksapp.tasklists.TaskList;
import tasksapp.tasklists.TaskListRepository;
import tasksapp.tasks.Task;
import tasksapp.tasks.TaskRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {
	private final TaskRepository taskRepository;
	private final TaskListRepository taskListRepository;

	@Autowired
	public DatabaseLoader(TaskRepository taskRepository, TaskListRepository taskListRepository) {
		this.taskRepository = taskRepository;
		this.taskListRepository = taskListRepository;
	}

	@Override
	public void run(String... run) {
		TaskList taskList1 = this.taskListRepository.save(new TaskList("TO DO"));

		Task task1 = this.taskRepository.save(new Task(false, "Look for jobs", "on linkedin", taskList1));
		Task task2 = this.taskRepository.save(new Task(false, "Go Shopping", "Buy Milk and Bread", taskList1));
		Task task3 = this.taskRepository.save(new Task(false, "Petrol", "check points", taskList1));
	}
}
