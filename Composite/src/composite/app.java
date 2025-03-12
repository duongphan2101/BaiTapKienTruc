package composite;

public class app {
    public static void main(String[] args) {
        // Tạo sản phẩm
        Product coffee = new Product("Cà phê", 30000);
        Product tea = new Product("Trà sữa", 40000);
        Product water = new Product("Nước suối", 10000);

        // Tạo bàn và thêm sản phẩm
        Table table1 = new Table();
        table1.addItem(coffee);
        table1.addItem(tea);

        Table table2 = new Table();
        table2.addItem(water);
        table2.addItem(tea);

        // Tạo quán cà phê và thêm bàn
        Cafe cafe = new Cafe();
        cafe.addTable(table1);
        cafe.addTable(table2);

        for (Table b: cafe) {
            System.out.println("Doanh Thu Cua Ban: "+b.getTotalPrice());
        }

        // In tổng doanh thu
        System.out.println("Tổng doanh thu quán cà phê: " + cafe.getTotalPrice() + " VND");
    }
}
