package tasksapp.tasklists;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:8080")
public interface TaskListRepository extends CrudRepository<TaskList, Long> {
}
