"use client";
const SkeletonProduct = () => {
    const numberOfCards = 6;

    return (
        <>
            {Array.from({ length: numberOfCards }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                    <div className="w-full h-40 bg-gray-200 rounded-lg" />
                    <div className="w-full h-10 flex flex-col gap-2" >
                        <div className="w-full h-4 bg-gray-200 rounded-lg" />
                        <div className="w-full h-4 bg-gray-200 rounded-lg" />
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-lg" />
                </div>
            ))}
        </>
    )

}

export default SkeletonProduct;