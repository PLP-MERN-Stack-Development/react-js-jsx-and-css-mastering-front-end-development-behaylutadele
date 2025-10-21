export default function Footer() {
  return (
    <footer className="py-6 border-t dark:border-gray-700 mt-8">
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} React Week 3 Project
      </p>
    </footer>
  )
}
