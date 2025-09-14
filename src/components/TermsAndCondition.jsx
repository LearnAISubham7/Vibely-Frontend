import React from "react";

export function TermsAndCondition() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Terms & Conditions
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          By using our platform, you agree to the following terms and
          conditions. Please read them carefully before creating an account.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
          1. Account Responsibilities
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          You are responsible for maintaining the confidentiality of your login
          credentials. Any activity under your account will be considered your
          responsibility.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
          2. Acceptable Use
        </h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
          <li>You agree not to misuse the platform.</li>
          <li>You must not upload harmful or illegal content.</li>
          <li>
            You must comply with all applicable laws while using our services.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
          3. Intellectual Property
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          All content, trademarks, and software on this platform remain the
          property of the company. Unauthorized use is prohibited.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
          4. Limitation of Liability
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We are not responsible for any damages or losses arising from your use
          of the platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
          5. Termination
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We reserve the right to suspend or terminate accounts that violate
          these terms.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          Last updated: August 29, 2025
        </p>
      </div>
    </div>
  );
}
