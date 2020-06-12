package tasksapp.tasklists;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;
import tasksapp.tasks.Task;

import java.util.ArrayList;
import java.util.Collection;
import java.util.function.Predicate;
import java.util.function.UnaryOperator;

public class OrderedTaskList extends ArrayList<Task> {
	@Override
	public boolean add(Task task) {
		super.add(task);
		task.setTaskListPosition(this.size()-1);
		return true;
	}

	@Override
	public void add(int index, Task task) {
		super.add(index, task);

		for (int i = index + 1; i < this.size(); i++) {
			Task currentTask = this.get(i);
			currentTask.setTaskListPosition(currentTask.getTaskListPosition() + 1);
		}
	}

	@Override
	public boolean addAll(Collection<? extends Task> tasks) {
		tasks.stream().forEach(task -> this.add(task));
		return true;
	}

	@Override
	public Task remove(int index) {
		Task task = super.remove(index);
		task.setTaskListPosition(-1);

		for (int i = index; i < this.size(); i++) {
			Task currentTask = this.get(i);
			currentTask.setTaskListPosition(currentTask.getTaskListPosition() - 1);
		}
		return task;
	}

	@Override
	public boolean remove(Object o) {
		boolean removeSuccessful = super.remove(o);

		if (!removeSuccessful)
			return false;

		Task removedTask = (Task) o;

		int prevTaskIndex = removedTask.getTaskListPosition();
		removedTask.setTaskListPosition(-1);

		for (int i = prevTaskIndex; i < this.size(); i++) {
			Task currentTask = this.get(i);
			currentTask.setTaskListPosition(currentTask.getTaskListPosition() - 1);
		}
		return true;
	}

	@Override
	public boolean removeAll(Collection<?> objects) {
		objects.stream().forEach(object -> this.remove(object));
		return true;
	}

	@Override
	public boolean removeIf(Predicate<? super Task> filter) {
		throw new NotImplementedException();
	}

	@Override
	protected void removeRange(int fromIndex, int toIndex) {
		for (int i = fromIndex; i < toIndex; i++) {
			this.remove(i);
		}
	}

	@Override
	public void replaceAll(UnaryOperator<Task> operator) {
		throw new NotImplementedException();
	}

	@Override
	public boolean retainAll(Collection<?> c) {
		for (Task currentTask : this) {
			if (!c.contains(currentTask)) {
				this.remove(currentTask);
			}
		}

		for (int index = 0; index < this.size(); index++) {
			Task currentTask = this.get(index);
			if (currentTask.getTaskListPosition() != index) {
				currentTask.setTaskListPosition(index);
			}
		}

		return true;
	}

	@Override
	public Task set(int index, Task task) {
		task = super.set(index, task);
		task.setTaskListPosition(index);
		return task;
	}
}
