package CoPhieu;

import java.util.ArrayList;
import java.util.List;

// CoPhieu.Observer interface
interface Observer {
    void update(double price);
}

// Concrete CoPhieu.Observer
class Investor implements Observer {
    private String name;

    public Investor(String name) {
        this.name = name;
    }

    @Override
    public void update(double price) {
        System.err.println(name + " notified: CoPhieu.Stock price changed to " + price);
    }
}

// Subject
class Stock {
    private List<Observer> observers = new ArrayList<>();
    private double price;

    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    public void setPrice(double price) {
        this.price = price;
        notifyObservers();
    }

    private void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(price);
        }
    }
}

// CoPhieu.Main class for testing
public class Main {
    public static void main(String[] args) {
        Stock stock = new Stock();
        Investor i1 = new Investor("Jay");
        stock.addObserver(i1);

        stock.setPrice(100);
        stock.setPrice(160.0);
    }
}
