import { productos } from "../data/products";
import ProductCard from "../components/ProductCard";

const OficinaPage = () => {

    const oficinaProductos = productos.filter((producto) => producto.categoria == "oficina");

    return (
        <div className="product-card">
            {oficinaProductos.map((producto) => (
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
export default OficinaPage;