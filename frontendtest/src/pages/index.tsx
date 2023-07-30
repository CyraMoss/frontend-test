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
      <main className="">
        {product ? (
          <div>
          <div className="header">Product Details</div>
          <div className="product">
            <Image
              src={product.imageURL} // Use "imageURL" instead of "image_url"
              alt="Product Image"
              width={150}
              height={150}
            />
            <div className="product-details">
              <h2>{product.title}</h2> {/* Use "title" instead of "name" */}
              <p>{product.description}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <div className="size-options">
                {/* <!-- Size selection options will be populated dynamically using JavaScript --> */}
              </div>
              <button className="add-to-cart-btn">Add to Cart</button>
              <div className="error-message"></div>
            </div>
          </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="mini-cart">
          {/* <!-- Mini cart content will be populated dynamically using JavaScript --> */}
        </div>
      </main>
    </>
  );
}
