package composite;

import java.util.ArrayList;
import java.util.List;

// Component (Giao diện chung)
interface Billable {
    double getTotalPrice();
}

// Leaf (Sản phẩm)
class Product implements Billable {
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public double getTotalPrice() {
        return price;
    }
}

// Composite (Bàn, chứa nhiều sản phẩm)
class Table implements Billable {
    private List<Billable> items = new ArrayList<>();

    public void addItem(Billable item) {
        items.add(item);
    }

    @Override
    public double getTotalPrice() {
        double total = 0;
        for (Billable item : items) {
            total += item.getTotalPrice();
        }
        return total;
    }
}

// Root (Quán cà phê, chứa nhiều bàn)
class Cafe implements Billable {
    private List<Table> tables = new ArrayList<>();

    public void addTable(Table table) {
        tables.add(table);
    }

    @Override
    public double getTotalPrice() {
        double total = 0;
        for (Table table : tables) {
            total += table.getTotalPrice();
        }
        return total;
    }
}

