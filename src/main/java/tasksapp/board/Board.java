package tasksapp.board;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import tasksapp.tasklists.TaskList;
import tasksapp.util.OrderedTaskList;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Getter @Setter
public class Board {
	private @Id @GeneratedValue Long id;
	private String name;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	@OneToMany(mappedBy = "board", cascade= CascadeType.ALL, orphanRemoval=true, fetch = FetchType.LAZY)
	@OrderBy(value="listPosition")
	private List<TaskList> taskLists = new OrderedTaskList<>();

	private int listPosition;

	private @Version @JsonIgnore Long version;

	public Board() {}

	public Board(String name) {
		this.name = name;
	}

	public void addTaskList(TaskList taskList) {
		taskLists.add(taskList);
	}

	public boolean removeTaskList(TaskList taskList) {
		boolean removedSuccessful = taskLists.remove(taskList);
		if (removedSuccessful)
			return true;
		return false;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Board board = (Board) o;
		return listPosition == board.listPosition &&
				Objects.equals(id, board.id) &&
				Objects.equals(name, board.name) &&
				Objects.equals(taskLists, board.taskLists) &&
				Objects.equals(version, board.version);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, taskLists, listPosition, version);
	}

	@Override
	public String toString() {
		return "Board{" +
				"id=" + id +
				", name='" + name + '\'' +
				", taskLists=" + taskLists +
				", listPosition=" + listPosition +
				", version=" + version +
				'}';
	}
}
