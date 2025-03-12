package PhanMem;

import java.util.ArrayList;
import java.util.List;

class Task implements Observer {
    private String name;
    private boolean status;

    public Task(String name, boolean status) {
        this.name = name;
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public void update(Task task) {
        System.err.println("Task "+name + " update status: "+status);
    }

    @Override
    public String toString() {
        return "Task{" +
                "name='" + name + '\'' +
                ", status=" + status +
                '}';
    }
}

interface Observer {
    void update(Task task);
}

class emp {
    private List<Observer> observers = new ArrayList<>();
    private Task task;
    void add(Observer observer) {
        observers.add(observer);
    }
    void remove(Observer observer) {
        observers.remove(observer);
    }
    void setTask(Task task) {
        this.task = task;
        notifyOb();
    }
    void notifyOb() {
        for (Observer observer : observers) {
            observer.update(task);
        }
    }
}
public class Software {
    public static void main(String[] args) {
        emp emp = new emp();
        Task task = new Task("Thiet Ke Figma", false);
        System.out.println(task.toString());
        task.setStatus(true);
        emp.add(task);
        emp.setTask(task);
    }
}
