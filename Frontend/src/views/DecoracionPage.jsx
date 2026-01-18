import { productos } from "../data/products";
import ProductCard from "../components/ProductCard";

const DecoracionPage = () => {

    const decoracionProductos = productos.filter((producto) => producto.categoria == "decoracion");

    return (
        <div className="category-grid">
            {decoracionProductos.map((producto) => (
                <ProductCard
                    key={producto.id}
                    img={producto.img}
                    nombre={producto.nombre}
                    descripcion={producto.descripcion}
                    variant="horizontal"
                    precio={producto.precio}
                />
            ))}
        </div>



    );
}
export default DecoracionPage;