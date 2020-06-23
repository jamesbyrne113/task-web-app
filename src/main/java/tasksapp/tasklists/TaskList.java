package tasksapp.tasklists;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Setter;
import lombok.Getter;
import tasksapp.board.Board;
import tasksapp.tasks.Task;
import tasksapp.util.OrderedListItem;
import tasksapp.util.OrderedTaskList;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Getter @Setter
public class TaskList implements OrderedListItem {
	private @Id @GeneratedValue Long id;
	private String name;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	@OneToMany(mappedBy = "taskList", cascade=CascadeType.ALL, orphanRemoval=true, fetch = FetchType.LAZY)
	@OrderBy(value="listPosition")
	private List<Task> tasks = new OrderedTaskList<>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="board_id")
	private Board board;

	@Column(name="task_list_position")
	private int listPosition;

	private @Version @JsonIgnore Long version;

	public TaskList() {}

	public TaskList(String name, Board board) {
		this.name = name;
		setBoard(board);
	}

	public void addTask(Task task) {
		tasks.add(task);
	}

	public boolean removeTask(Task task) {
		boolean removedSuccessful = tasks.remove(task);
		if (removedSuccessful)
			return true;
		return false;
	}

	public void setBoard(Board board) {
		if (this.board != null)
			this.board.removeTaskList(this);
		this.board = board;
		board.addTaskList(this);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		TaskList taskList = (TaskList) o;
		return listPosition == taskList.listPosition &&
				Objects.equals(id, taskList.id) &&
				Objects.equals(name, taskList.name) &&
				Objects.equals(tasks, taskList.tasks) &&
				Objects.equals(board, taskList.board) &&
				Objects.equals(version, taskList.version);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, tasks, board, listPosition, version);
	}

	@Override
	public String toString() {
		return "TaskList{" +
				"id=" + id +
				", name='" + name + '\'' +
				", tasks=" + tasks +
				", board=" + board +
				", listPosition=" + listPosition +
				", version=" + version +
				'}';
	}
}
