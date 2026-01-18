import { productos } from "../data/products";
import ProductCard from "../components/ProductCard";

const CuartoPage = () => {

    const cuartoProductos = productos.filter((producto) => producto.categoria == "cuarto");

    return (
        <div className="category-grid">
            {cuartoProductos.map((producto) => (
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
export default CuartoPage;