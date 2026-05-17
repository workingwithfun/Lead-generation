import type { Lead } from "../types/lead";
import { FiEdit, FiTrash } from "react-icons/fi";

interface Props {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

const LeadsTable = ({
  leads,
  onEdit,
  onDelete,
  isAdmin,
}: Props) => {
  if (!leads.length) {
    return (
      <div className="bg-white p-6 rounded-lg text-center">
        No leads found
      </div>
    );
  }

  return (
    <div className="overflow-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Source
            </th>

            <th className="p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-t"
            >
              <td className="p-3">
                {lead.name}
              </td>

              <td className="p-3">
                {lead.email}
              </td>

              <td className="p-3">
                {lead.status}
              </td>

              <td className="p-3">
                {lead.source}
              </td>

              <td className="p-3 flex gap-3">
                <button
                  onClick={() => onEdit(lead)}
                >
                  <FiEdit />
                </button>

                {isAdmin && (
                  <button
                    onClick={() =>
                      onDelete(lead._id)
                    }
                  >
                    <FiTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;