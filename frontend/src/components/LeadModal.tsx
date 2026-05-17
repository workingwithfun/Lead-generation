import { useForm } from "react-hook-form";
import API from "../api/axios";

import {
  User,
  Mail,
  Briefcase,
  Tag,
  X,
} from "lucide-react";

interface Props {
  fetchLeads: () => void;
  editingLead?: any;
  closeModal: () => void;
}

const LeadModal = ({
  fetchLeads,
  editingLead,
  closeModal,
}: Props) => {
  const { register, handleSubmit } =
    useForm({
      defaultValues:
        editingLead || {
          status: "New",
          source: "Website",
        },
    });

  const onSubmit = async (
    data: any
  ) => {
    try {
      if (editingLead) {
        await API.put(
          `/leads/${editingLead._id}`,
          data
        );
      } else {
        await API.post(
          "/leads",
          data
        );
      }

      fetchLeads();
      closeModal();
    } catch (error) {
      alert("Operation failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}

        <div className="bg-slate-900 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                Smart Leads CRM
              </p>

              <h2 className="text-2xl font-bold">
                {editingLead
                  ? "Edit Lead"
                  : "Create Lead"}
              </h2>
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}

        <div className="p-6 space-y-4">
          {/* Name */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-3.5 text-slate-400"
              />

              <input
                {...register("name")}
                placeholder="Enter full name"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-200 outline-none transition"
              />
            </div>
          </div>

          {/* Email */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-3.5 text-slate-400"
              />

              <input
                {...register("email")}
                placeholder="Enter email"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-200 outline-none transition"
              />
            </div>
          </div>

          {/* Status */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Status
            </label>

            <div className="relative">
              <Tag
                size={18}
                className="absolute left-4 top-3.5 text-slate-400"
              />

              <select
                {...register("status")}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-200 outline-none appearance-none transition"
              >
                <option>
                  New
                </option>

                <option>
                  Contacted
                </option>

                <option>
                  Qualified
                </option>

                <option>
                  Lost
                </option>
              </select>
            </div>
          </div>

          {/* Source */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Source
            </label>

            <div className="relative">
              <Briefcase
                size={18}
                className="absolute left-4 top-3.5 text-slate-400"
              />

              <select
                {...register("source")}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-200 outline-none appearance-none transition"
              >
                <option>
                  Website
                </option>

                <option>
                  Instagram
                </option>

                <option>
                  Referral
                </option>
              </select>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl font-semibold transition"
            >
              {editingLead
                ? "Update"
                : "Save"}
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="flex-1 border border-slate-200 hover:bg-slate-100 text-slate-700 py-3 rounded-2xl font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LeadModal;