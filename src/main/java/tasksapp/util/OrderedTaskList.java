package tasksapp.util;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;
import tasksapp.tasks.Task;

import java.util.ArrayList;
import java.util.Collection;
import java.util.function.Predicate;
import java.util.function.UnaryOperator;

public class OrderedTaskList<E extends OrderedListItem> extends ArrayList<E> {
	@Override
	public boolean add(E element) {
		super.add(element);
		element.setListPosition(this.size()-1);
		return true;
	}

	@Override
	public void add(int index, E element) {
		super.add(index, element);

		for (int i = index + 1; i < this.size(); i++) {
			E currentElement = this.get(i);
			currentElement.setListPosition(currentElement.getListPosition() + 1);
		}
	}

	@Override
	public boolean addAll(Collection<? extends E> elements) {
		elements.forEach(this::add);
		return true;
	}

	@Override
	public E remove(int index) {
		E element = super.remove(index);
		element.setListPosition(-1);

		for (int i = index; i < this.size(); i++) {
			E currentElement = this.get(i);
			currentElement.setListPosition(currentElement.getListPosition() - 1);
		}
		return element;
	}

	@Override
	public boolean remove(Object o) {
		boolean removeSuccessful = super.remove(o);

		if (!removeSuccessful)
			return false;

		Task removedTask = (Task) o;

		int prevTaskIndex = removedTask.getListPosition();
		removedTask.setListPosition(-1);

		for (int i = prevTaskIndex; i < this.size(); i++) {
			E currentElement = this.get(i);
			currentElement.setListPosition(currentElement.getListPosition() - 1);
		}
		return true;
	}

	@Override
	public boolean removeAll(Collection<?> objects) {
		objects.forEach(this::remove);
		return true;
	}

	@Override
	public boolean removeIf(Predicate<? super E> filter) {
		throw new NotImplementedException();
	}

	@Override
	protected void removeRange(int fromIndex, int toIndex) {
		for (int i = fromIndex; i < toIndex; i++) this.remove(i);
	}

	@Override
	public void replaceAll(UnaryOperator<E> operator) {
		throw new NotImplementedException();
	}

	@Override
	public boolean retainAll(Collection<?> c) {
		for (E currentElement : this) {
			if (!c.contains(currentElement)) {
				this.remove(currentElement);
			}
		}

		for (int index = 0; index < this.size(); index++) {
			E currentElement = this.get(index);
			if (currentElement.getListPosition() != index) {
				currentElement.setListPosition(index);
			}
		}

		return true;
	}

	@Override
	public E set(int index, E element) {
		element = super.set(index, element);
		element.setListPosition(index);
		return element;
	}
}
