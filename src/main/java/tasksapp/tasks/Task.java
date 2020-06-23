package tasksapp.tasks;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import tasksapp.tasklists.TaskList;
import tasksapp.util.OrderedListItem;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter @Setter
public class Task implements OrderedListItem {
	private @Id @GeneratedValue Long id;
	private boolean complete;
	private String title;
	private String description;

	private @Version @JsonIgnore Long version;

	@Column(name="task_list_position")
	private int listPosition;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="task_list_id", nullable=false)
	private TaskList taskList;

	public Task() {}

	public Task(boolean complete, String title, String description, TaskList taskList) {
		this.complete = complete;
		this.title = title;
		this.description = description;
		setTaskList(taskList);
	}

	public void setTaskList(TaskList taskList) {
		if (this.taskList != null)
			this.taskList.removeTask(this);
		this.taskList = taskList;
		taskList.addTask(this);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Task task = (Task) o;
		return complete == task.complete &&
				listPosition == task.listPosition &&
				Objects.equals(id, task.id) &&
				Objects.equals(title, task.title) &&
				Objects.equals(description, task.description) &&
				Objects.equals(version, task.version) &&
				Objects.equals(taskList, task.taskList);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, complete, title, description, version, listPosition, taskList);
	}

	@Override
	public String toString() {
		return "Task{" +
				"id=" + id +
				", complete=" + complete +
				", title='" + title + '\'' +
				", description='" + description + '\'' +
				", version=" + version +
				", listPosition=" + listPosition +
				", taskList=" + taskList +
				'}';
	}
}
