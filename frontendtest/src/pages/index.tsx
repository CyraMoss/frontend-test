import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import { CartContext, type CartItem } from "~/utils/cartContext";
import { type CartContextType } from "~/utils/cartContext";

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
  const { addToCart } = useContext<CartContextType>(CartContext);

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

  const handleAddToCart = () => {
    console.log("add to cart clicked")
    // Check if a size is selected (you might want to update this logic based on your actual size selection UI)
    const selectedSize = product?.sizeOptions[0]?.label;
    if (selectedSize && product) {
      // Create the item object to add to the cart
      const itemToAdd: CartItem = {
        image: product.imageURL,
        name: product.title,
        price: product.price,
        quantity: 1, // Set initial quantity to 1
        size: selectedSize,
      };

      // Call the addToCart function from the CartContext to add the item to the cart
      addToCart(itemToAdd);

      setProduct((prevProduct) => {
        if (prevProduct) {
          const updatedSizeOptions = prevProduct.sizeOptions.map((sizeOption, index) => {
            if (index === 0) {
              return { ...sizeOption, selected: false };
            }
            return sizeOption;
          });
          return { ...prevProduct, sizeOptions: updatedSizeOptions };
        }
        return prevProduct;
      });
    } else {
      // Show error message if no size is selected (you might want to handle this differently based on your UI)
      const errorMessage = document.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.textContent = "Please select a size.";
      }
    }
  };


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
              <button className="border-2 border-black px-5 py-2" onClick={handleAddToCart}>
  Add to Cart
</button>
              <div className="error-message"></div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
