import { productos } from "../data/products";
import ProductCard from "../components/ProductCard";

const BanioPage = () => {

    const bañoProductos = productos.filter((producto) => producto.categoria == "baño");

    return (
        <div className="product-card">
            {bañoProductos.map((producto) => (
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
export default BanioPage;
