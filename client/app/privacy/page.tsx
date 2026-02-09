export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-24 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                BS Education Global ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Personal identification information (name, email, phone number)</li>
                <li>Educational background and academic records</li>
                <li>Application preferences and university choices</li>
                <li>Communication records and correspondence</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Provide personalized admission support and guidance</li>
                <li>Process university applications on your behalf</li>
                <li>Communicate with you about our services</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@bsedu.com" className="text-blue-600 hover:underline">
                  privacy@bsedu.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
