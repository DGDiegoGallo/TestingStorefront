import { getProducts } from "lib/shopify";
import { Suspense } from "react";
import { Pagination } from "../../components/product/Pagination";
import { getProductOptions } from "../../components/product/ProductOptions";
import FilteredProducts from "../../components/product/filtered-products";

export const runtime = "edge";

export const metadata = {
	title: "Productos",
	description: "Explora nuestra colección de productos",
};

const PRODUCTS_PER_PAGE = 12; // Número de productos por página

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;
	const products = await getProducts({ sortKey: 'id', reverse: false });
	const filterOptions = getProductOptions(products);

	const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
	const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
	const endIndex = startIndex + PRODUCTS_PER_PAGE;
	const currentProducts = products.slice(startIndex, endIndex);

	return (
		<main 
			className="min-h-screen w-full bg-white"
			style={{
				backgroundImage: "url('/images/web-fondo-blanco.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundAttachment: 'fixed'
			}}
		>
			<div className="mx-auto max-w-screen-2xl px-4 pt-24 sm:pt-32">
				<div className="relative">
					<Suspense>
						<FilteredProducts products={currentProducts} filterOptions={filterOptions} />
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={(page) => {
								window.location.href = `/products?page=${page}`;
							}}
						/>
					</Suspense>
				</div>
			</div>
		</main>
	);
}
