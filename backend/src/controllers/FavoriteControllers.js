import { getFavoriteProductIdsModel,insertFavoriteModel, deleteFavoriteModel } from "../models/favoritosModels.js";

// GET /api/favoritos (o /api/favorites, según cómo montes el router)
export const listFavoritesControler = async (req, res) => {
  try {
    const productIds = await getFavoriteProductIdsModel(req.user.id);

    return res.json({
      productIds,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener favoritos" });
  }
};

// POST /api/favoritos
export const createFavoriteControler = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "productId requerido" });
  }

  try {
    await insertFavoriteModel(req.user.id, productId);
    return res.status(201).json({ message: "Agregado a favoritos" });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Ya es favorito" });
    }
    return res.status(500).json({ message: "Error al agregar favorito" });
  }
};

// DELETE /api/favoritos/:productId
export const removeFavoriteControler = async (req, res) => {
  const { productId } = req.params;

  try {
    await deleteFavoriteModel(req.user.id, productId);
    return res.json({ message: "Eliminado de favoritos" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar favorito" });
  }
};
