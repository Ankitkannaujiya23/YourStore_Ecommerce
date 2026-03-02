import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCollectionProductsBySlugQuery } from "./collectionApi";

const getArrayFromResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.response)) return payload.response;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.result)) return payload.result;
  return [];
};

const getCollectionTitle = (payload, slug) => {
  return (
    payload?.collection?.title ??
    payload?.collection?.name ??
    payload?.title ??
    payload?.name ??
    slug?.replace(/-/g, " ") ??
    "Collection"
  );
};

const normalizeProduct = (product, index) => {
  const id = product?.id ?? product?._id ?? index;
  const name = product?.name ?? product?.title ?? "Untitled Product";
  const price = product?.price ?? 0;
  const image = Array.isArray(product?.image)
    ? product.image[0]
    : product?.image ?? product?.thumbnail ?? "";

  return { id, name, price, image };
};

const CollectionProductsPage = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetCollectionProductsBySlugQuery(slug, {
    skip: !slug,
  });

  const products = getArrayFromResponse(data).map(normalizeProduct);
  const collectionTitle = getCollectionTitle(data, slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/40 to-white px-6 py-12 md:px-16">
      <div className="mb-10">
        <p className="mb-2 text-sm text-emerald-700">
          <Link to="/collections" className="font-medium hover:underline">
            Collections
          </Link>
          <span className="mx-2">/</span>
          <span>{collectionTitle}</span>
        </p>
        <h1 className="text-3xl font-bold md:text-5xl">{collectionTitle}</h1>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="h-60 animate-pulse bg-gray-200" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <div className="mx-auto max-w-xl rounded-xl border border-red-100 bg-red-50 p-6 text-center text-red-700">
          Unable to load products for this collection.
        </div>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-600">
          No products found in this collection.
        </div>
      )}

      {!isLoading && !isError && products.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to={`/productDetails/${product.id}`}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-60 w-full bg-gradient-to-br from-emerald-200 via-teal-100 to-cyan-100" />
                )}

                <div className="p-4">
                  <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm font-medium text-gray-600">Rs. {product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionProductsPage;
