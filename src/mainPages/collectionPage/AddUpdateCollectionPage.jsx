import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SubmitButtonComp from "../../components/utilComponents/SubmitButtonComp";
import {
  useAddCollectionMutation,
  useGetCollectionByIdQuery,
  useUpdateCollectionMutation,
} from "./collectionApi";

const defaultValues = {
  name: "",
  slug: "",
  description: "",
  banner_image: "",
  is_active: true,
  productIdsInput: "",
};

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Collection name is required"),
  slug: Yup.string().trim().required("Collection slug is required"),
  description: Yup.string().trim().required("Description is required"),
  banner_image: Yup.string()
    .trim()
    .url("Banner image must be a valid URL")
    .required("Banner image URL is required"),
});

const toProductIdsText = (productIds) => {
  if (!Array.isArray(productIds)) return "";
  return productIds.join(", ");
};

const extractCollectionFromResponse = (payload, id) => {
  const candidates = [
    payload?.data,
    payload?.response,
    payload?.collection,
    payload?.result,
    payload,
  ];

  for (const source of candidates) {
    if (!source) continue;
    if (Array.isArray(source)) {
      const found = source.find(
        (item) => String(item?.id ?? item?._id) === String(id)
      );
      if (found) return found;
      if (source[0]) return source[0];
      continue;
    }
    if (typeof source === "object") {
      if (source.id || source._id) return source;
    }
  }

  return null;
};

const parseProductIds = (rawValue) => {
  if (!rawValue) return [];
  return rawValue
    .split(/[\n,\s]+/g)
    .map((id) => id.trim())
    .filter(Boolean);
};

const AddUpdateCollectionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(defaultValues);

  const { data: collectionByIdData, isFetching } = useGetCollectionByIdQuery(id, {
    skip: !id,
  });
  const [addCollection, { isLoading: isAddLoading }] = useAddCollectionMutation();
  const [updateCollection, { isLoading: isUpdateLoading }] =
    useUpdateCollectionMutation();

  const isUpdateMode = Boolean(id);
  const isSubmitting = isAddLoading || isUpdateLoading;

  useEffect(() => {
    if (!isUpdateMode || !collectionByIdData) return;

    const collection = extractCollectionFromResponse(collectionByIdData, id);
    if (!collection) return;

    setInitialValues({
      name: collection?.name ?? collection?.title ?? "",
      slug: collection?.slug ?? "",
      description: collection?.description ?? "",
      banner_image: collection?.banner_image ?? collection?.bannerImage ?? "",
      is_active:
        typeof collection?.is_active === "boolean"
          ? collection.is_active
          : typeof collection?.isActive === "boolean"
          ? collection.isActive
          : true,
      productIdsInput: toProductIdsText(collection?.productIds ?? collection?.products),
    });
  }, [collectionByIdData, id, isUpdateMode]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const model = {
          name: values.name.trim(),
          slug: values.slug.trim(),
          description: values.description.trim(),
          banner_image: values.banner_image.trim(),
          is_active: values.is_active,
          productIds: parseProductIds(values.productIdsInput),
        };

        const response = isUpdateMode
          ? await updateCollection({ id, ...model })
          : await addCollection(model);

        const statusCode = response?.data?.statusCode;
        const message =
          response?.data?.message ||
          (isUpdateMode
            ? "Collection updated successfully."
            : "Collection added successfully.");

        if (statusCode === 200 || statusCode === 201) {
          toast.success(message);
          if (!isUpdateMode) {
            formik.resetForm({ values: defaultValues });
          } else {
            navigate("/collections");
          }
          return;
        }

        toast.error(response?.error?.data?.message || message);
      } catch (error) {
        toast.error(error?.message || "Failed to save collection.");
      }
    },
  });

  const title = useMemo(
    () => `${isUpdateMode ? "Update" : "Add New"} Collection`,
    [isUpdateMode]
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">{title}</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Collection Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                placeholder="e.g. Summer Collection"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={formik.values.slug}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                placeholder="e.g. summer-collection"
              />
              {formik.touched.slug && formik.errors.slug && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.slug}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              placeholder="Describe this collection"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="banner_image" className="block text-sm font-medium text-gray-700">
              Banner Image URL
            </label>
            <input
              id="banner_image"
              name="banner_image"
              type="text"
              value={formik.values.banner_image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              placeholder="https://example.com/banner.jpg"
            />
            {formik.touched.banner_image && formik.errors.banner_image && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.banner_image}</p>
            )}
          </div>

          {formik.values.banner_image && (
            <img
              src={formik.values.banner_image}
              alt="Collection banner preview"
              className="h-48 w-full rounded-lg object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}

          <div>
            <label htmlFor="productIdsInput" className="block text-sm font-medium text-gray-700">
              Product IDs
            </label>
            <textarea
              id="productIdsInput"
              name="productIdsInput"
              rows={3}
              value={formik.values.productIdsInput}
              onChange={formik.handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              placeholder="Add product IDs separated by comma, space, or new line"
            />
            <p className="mt-1 text-xs text-gray-500">
              Example: `12, 45, 78` or each id on a new line.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              checked={formik.values.is_active}
              onChange={formik.handleChange}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              Active collection
            </label>
          </div>

          <div className="pt-2">
            <SubmitButtonComp
              label={
                isFetching
                  ? "Loading..."
                  : isUpdateMode
                  ? "Update Collection"
                  : "Add Collection"
              }
              type="submit"
              isLoading={isSubmitting || isFetching}
              className="bg-purple-600 hover:bg-purple-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateCollectionPage;
