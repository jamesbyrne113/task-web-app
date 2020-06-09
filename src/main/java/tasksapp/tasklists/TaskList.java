package tasksapp.tasklists;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Setter;
import lombok.Getter;
import tasksapp.tasks.Task;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class TaskList {
	@Getter @Setter private @Id @GeneratedValue Long id;
	@Getter @Setter private String name;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	@OneToMany(mappedBy = "taskList", cascade=CascadeType.ALL, orphanRemoval=true, fetch = FetchType.LAZY)
	@OrderBy(value="taskListPosition")
	@Getter @Setter private List<Task> tasks = new OrderedTaskList();

	public TaskList() {}

	public TaskList(String name) {
		this.name = name;
	}

//	public void moveTask(Task task, int position) {
//		this.tasks.remove(task);
//		this.tasks.add(position, task);
//	}

	public void addTask(Task task) {
		tasks.add(task);
	}

//	public boolean removeTask(Task task) {
//		boolean removedSuccessful = tasks.remove(task);
//		if (removedSuccessful) {
//			task.setTaskList(null);
//			return true;
//		}
//
//		return false;
//	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		TaskList taskList = (TaskList) o;
		return Objects.equals(id, taskList.id) &&
				Objects.equals(name, taskList.name) &&
				Objects.equals(tasks, taskList.tasks);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, tasks);
	}

	@Override
	public String toString() {
		return "TaskList{" +
				"id=" + id +
				", name='" + name + '\'' +
//				", tasks=" + tasks +
				'}';
	}
}
