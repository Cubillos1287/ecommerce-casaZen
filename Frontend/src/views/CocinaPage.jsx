import { productos } from "../data/products";
import ProductCard from "../components/ProductCard";

const CocinaPage = () => {

    const cocinaProductos = productos.filter((producto) => producto.categoria == "cocina");

    return (
        <div className="product-card">
            {cocinaProductos.map((producto) => (
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
export default CocinaPage;