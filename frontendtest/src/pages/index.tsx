import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  sizeOptions: { id: number; label: string }[];
}

export default function ProductPage() {
  const [product, setProduct] = useState<ProductData | null>();

  useEffect(() => {
    // Fetch product information from the API
    async function fetchProductDetails() {
      try {
        const response = await fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product');
        const data = await response.json() as ProductData
        setProduct(data); // Update the product state with the fetched data
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    void fetchProductDetails();
  }, []);

  return (
    <>
      <Head>
        <title>Clothing Site</title>
        <meta name="description" content="Made for a technical test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen pt-6">
        {product ? (
          <div className="flex-1 flex">
            <Image
              src={product.imageURL}
              alt="Product Image"
              layout="responsive" // Set the layout to responsive
              width={300} // Set a fixed width for the image
              height={400} // Set a fixed height for the image
              objectFit="contain" // Adjust the image to maintain its aspect ratio
            />
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {product && (
          <div className="flex-1 flex flex-col pl-4">
            <div className="product-details">
              <h2 className="text-2xl font-semibold py-4">{product.title}</h2>
              <hr/>
              <p className="font-bold py-2"> ${product.price.toFixed(2)}</p>
              <p>{product.description}</p>
              <div className="size-options">
                <h3 className="font-bold py-2">Sizes:</h3>
                <ul className="flex mb-4">
                  {product.sizeOptions.map((size) => (
                    <li key={size.id} className="p-4 m-2 border-2 border-black">{size.label}</li>
                  ))}
                </ul>
              </div>
              <button className="border-2 border-black px-5 py-2">Add to Cart</button>
              <div className="error-message"></div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
