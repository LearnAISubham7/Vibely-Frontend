import React from "react";

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and safeguard your information when you use our
          platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
          1. Information We Collect
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We may collect personal details such as your name, email address,
          profile picture, and any files you upload. Additionally, we may
          collect non-personal data like browser type and device information.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
          <li>To create and manage your account.</li>
          <li>To improve our services and user experience.</li>
          <li>To communicate important updates or promotions.</li>
          <li>To ensure security and prevent fraud.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
          3. Data Protection
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We implement strong security measures to safeguard your personal
          information. However, no method of transmission over the internet is
          completely secure.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
          4. Your Rights
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          You have the right to update, delete, or request access to your
          personal information. Please contact us if you wish to exercise these
          rights.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          Last updated: August 29, 2025
        </p>
      </div>
    </div>
  );
}
