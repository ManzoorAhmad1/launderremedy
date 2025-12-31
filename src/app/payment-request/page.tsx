"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, DollarSign, Clock, XCircle } from "lucide-react";
import paymentRequestService from "@/services/paymentRequest.service";
import toast from "react-hot-toast";

export default function PaymentRequestPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    account_holder_name: "",
    bank_name: "",
    account_number: "",
    sort_code: "",
    iban: "",
    swift_code: "",
    additional_info: "",
  });

  useEffect(() => {
    loadPaymentRequests();
  }, []);

  const loadPaymentRequests = async () => {
    try {
      setLoading(true);
      const response = await paymentRequestService.getMyPaymentRequests();
      setRequests(response.data || []);
    } catch (error: any) {
      console.error("Failed to load payment requests:", error);
      toast.error(error.message || "Failed to load payment requests");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await paymentRequestService.createPaymentRequest(formData);
      toast.success(response.message);
      setShowModal(false);
      setFormData({
        account_holder_name: "",
        bank_name: "",
        account_number: "",
        sort_code: "",
        iban: "",
        swift_code: "",
        additional_info: "",
      });
      loadPaymentRequests();
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 text-sm font-medium">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Approved
          </span>
        );
      case "processed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Processed
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-sm font-medium">
            <XCircle className="w-4 h-4" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payment Requests</h1>
            <p className="text-muted-foreground mt-2">
              Submit your account details for payments
            </p>
          </div>
          
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <DollarSign className="w-5 h-5" />
            New Request
          </button>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <p className="text-muted-foreground">
                No payment requests yet. Submit your first request to get started.
              </p>
            </div>
          ) : (
            requests.map((request) => (
              <div
                key={request._id}
                className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {request.account_details.bank_name}
                      </h3>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Account Holder: {request.account_details.account_holder_name}</p>
                      <p>Account Number: •••• {request.account_details.account_number.slice(-4)}</p>
                      {request.account_details.sort_code && (
                        <p>Sort Code: {request.account_details.sort_code}</p>
                      )}
                      <p className="text-xs">Submitted: {formatDate(request.createdAt)}</p>
                    </div>

                    {request.admin_notes && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium text-foreground">Admin Notes:</p>
                        <p className="text-sm text-muted-foreground">{request.admin_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Submit Payment Request
                </h2>
                
                <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                  <p className="text-sm text-foreground">
                    <strong>Important:</strong> Your payment request will be sent to our admin team for review.
                    You will be contacted shortly once your request is approved. Our team will process the payment
                    and reach out to you with further details. Thank you for your patience.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Account Holder Name *
                    </label>
                    <input
                      type="text"
                      value={formData.account_holder_name}
                      onChange={(e) =>
                        setFormData({ ...formData, account_holder_name: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      value={formData.bank_name}
                      onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      value={formData.account_number}
                      onChange={(e) =>
                        setFormData({ ...formData, account_number: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Sort Code
                      </label>
                      <input
                        type="text"
                        value={formData.sort_code}
                        onChange={(e) =>
                          setFormData({ ...formData, sort_code: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        IBAN
                      </label>
                      <input
                        type="text"
                        value={formData.iban}
                        onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      SWIFT/BIC Code
                    </label>
                    <input
                      type="text"
                      value={formData.swift_code}
                      onChange={(e) =>
                        setFormData({ ...formData, swift_code: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Information
                    </label>
                    <textarea
                      value={formData.additional_info}
                      onChange={(e) =>
                        setFormData({ ...formData, additional_info: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-700 transition-colors"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
