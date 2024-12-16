export function Page({ pageName }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h3 className="text-3xl font-semibold text-gray-900 text-center mb-4">
          {pageName}
        </h3>
        <p className="text-gray-600 text-center">
          Welcome to the {pageName} page! Here you can see post contents.
        </p>
      </div>
    </div>
  );
}
