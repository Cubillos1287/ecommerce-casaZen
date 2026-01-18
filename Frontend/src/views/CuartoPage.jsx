import { productos } from "../data/products";
import ProductCard from "../components/ProductCard";

const CuartoPage = () => {

    const cuartoProductos = productos.filter((producto) => producto.categoria == "cuarto");

    return (
        <div className="product-card">
            {cuartoProductos.map((producto) => (
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
export default CuartoPage;