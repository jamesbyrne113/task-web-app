package tasksapp.tasks;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:8080")
public interface TaskRepository extends CrudRepository<Task, Long> {
}
