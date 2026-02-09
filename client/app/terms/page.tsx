export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-24 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
              Terms of Service
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using BS Education Global's services, you agree to be bound by these 
                Terms of Service and all applicable laws and regulations. If you do not agree with any 
                of these terms, you are prohibited from using our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Use of Services</h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are designed to assist students in their university application process. 
                You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Provide accurate and truthful information</li>
                <li>Use our services for lawful purposes only</li>
                <li>Respect intellectual property rights</li>
                <li>Not misuse or attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Service Description</h2>
              <p className="text-gray-600 leading-relaxed">
                BS Education Global provides university application support, guidance, and related 
                educational services. While we strive to provide accurate information, we do not 
                guarantee admission to any institution.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                BS Education Global shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of our services 
                following any changes constitutes acceptance of those changes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
              <p className="text-gray-600 leading-relaxed">
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@bsedu.com" className="text-blue-600 hover:underline">
                  legal@bsedu.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
