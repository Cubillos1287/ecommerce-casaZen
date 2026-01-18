import { productos } from "../data/products";
import ProductCard from "../components/ProductCard";

const DecoracionPage = () => {

    const decoracionProductos = productos.filter((producto) => producto.categoria == "decoracion");

    return (
        <div className="product-card">
            {decoracionProductos.map((producto) => (
                <ProductCard
                    key={producto.id}
                    img={producto.img}
                    nombre={producto.nombre}
                    descripcion={producto.descripcion}
                    precio={producto.precio}
                />
            ))}
        </div>



    );
}
export default DecoracionPage;