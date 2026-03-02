import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCollectionsQuery } from "./collectionApi";

const getArrayFromResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.response)) return payload.response;
  if (Array.isArray(payload?.collections)) return payload.collections;
  if (Array.isArray(payload?.result)) return payload.result;
  return [];
};

const normalizeCollection = (collection, index) => {
  const id = collection?.id ?? collection?._id ?? index;
  const title =
    collection?.title ??
    collection?.name ??
    collection?.collectionName ??
    `Collection ${index + 1}`;
  const description =
    collection?.description ??
    collection?.tagline ??
    "Handpicked products just for your style.";
  const image =
    collection?.image ??
    collection?.coverImage ??
    collection?.bannerImage ??
    collection?.thumbnail ??
    "";
  const productsCount =
    collection?.productsCount ??
    collection?.productCount ??
    collection?.count ??
    (Array.isArray(collection?.products) ? collection.products.length : 0);
  const slug = collection?.slug ?? "";

  return { id, title, description, image, productsCount, slug };
};

const CollectionsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCollectionsQuery();
  const collectionList = getArrayFromResponse(data).map(normalizeCollection);

  const handleViewCollection = (collection) => {
    if (!collection.slug) return;
    navigate(`/collection/${collection.slug}/products`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-12 md:px-16">
      <div className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
          Explore Our Collections
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Discover curated selections crafted for every mood and occasion.
        </p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="h-64 animate-pulse bg-gray-200" />
              <div className="space-y-3 p-6">
                <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <div className="mx-auto max-w-xl rounded-xl border border-red-100 bg-red-50 p-6 text-center text-red-700">
          Unable to load collections right now. Please try again shortly.
        </div>
      )}

      {!isLoading && !isError && collectionList.length === 0 && (
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-600">
          No collections found.
        </div>
      )}

      {!isLoading && !isError && collectionList.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collectionList.map((collection) => (
            <div key={collection.id}>
              <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative overflow-hidden">
                  {collection.image ? (
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-64 w-full bg-gradient-to-br from-emerald-200 via-teal-100 to-cyan-100" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition duration-300 group-hover:opacity-100">
                    <button
                      onClick={() => handleViewCollection(collection)}
                      disabled={!collection.slug}
                      className="rounded-2xl bg-white px-6 py-2 text-base font-semibold text-gray-800 shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      View Collection
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 line-clamp-1 text-2xl font-semibold">{collection.title}</h3>
                  <p className="mb-3 line-clamp-2 text-gray-500">{collection.description}</p>
                  <p className="text-sm text-gray-400">{collection.productsCount} Products</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
