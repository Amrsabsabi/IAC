import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminCampaigns() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCampaigns = async () => {
    try {
      const res = await api.get("/campaigns");
      setCampaigns(res.data.campaigns);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  const deleteCampaign = async (slug) => {
    const ok = confirm("Are you sure you want to delete this campaign?");
    if (!ok) return;

    try {
      await api.delete(`/admin/campaigns/${slug}`);
      setCampaigns((prev) => prev.filter((item) => item.slug !== slug));
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F7F6] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#155541]">
              Admin Campaigns
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage, edit, and delete campaigns.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/campaigns/new"
              className="rounded-xl bg-[#155541] px-5 py-3 font-bold text-white hover:bg-[#157C5B]"
            >
              Add Campaign
            </Link>

            <button
              onClick={logout}
              className="rounded-xl border border-[#155541] px-5 py-3 font-bold text-[#155541] hover:bg-white"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
            <p className="font-bold text-[#155541]">Loading...</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white shadow-lg">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-[#155541] text-white">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Raised</th>
                  <th className="p-4">Target</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {campaigns.map((campaign) => {
                  const raised = Number(campaign.raised_amount || 0);
                  const target = Number(campaign.target_amount || 0);
                  const progress =
                    target > 0 ? Math.min((raised / target) * 100, 100) : 0;

                  return (
                    <tr key={campaign.id} className="border-b align-middle">
                      <td className="p-4">
                        {campaign.hero_image ? (
                          <img
                            src={campaign.hero_image}
                            alt={campaign.title_en}
                            className="h-16 w-24 rounded-lg object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "/campaigns/ramadan_market.jpeg";
                            }}
                          />
                        ) : (
                          <span className="text-gray-400">No image</span>
                        )}
                      </td>

                      <td className="p-4">
                        <p className="font-bold text-[#3C3C3C]">
                          {campaign.title_en}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {campaign.title_ar}
                        </p>
                      </td>

                      <td className="p-4 text-sm">{campaign.slug}</td>

                      <td className="p-4">
                        <span className="rounded-full bg-[#155541]/10 px-3 py-1 text-xs font-bold capitalize text-[#155541]">
                          {campaign.type}
                        </span>
                      </td>

                      <td className="p-4">
                        {campaign.currency || "USD"} {raised.toLocaleString()}
                      </td>

                      <td className="p-4">
                        {campaign.currency || "USD"} {target.toLocaleString()}
                      </td>

                      <td className="p-4">
                        <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#155541]">
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-[#155541]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={`/admin/campaigns/edit/${campaign.slug}`}
                            className="rounded-lg bg-[#155541] px-4 py-2 text-sm font-bold text-white hover:bg-[#157C5B]"
                          >
                            Edit
                          </Link>

                          <Link
                            to={`/campaigns/${campaign.slug}`}
                            className="rounded-lg border border-[#155541] px-4 py-2 text-sm font-bold text-[#155541] hover:bg-[#155541] hover:text-white"
                          >
                            View
                          </Link>

                          <button
                            onClick={() => deleteCampaign(campaign.slug)}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {campaigns.length === 0 && (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500">
                      No campaigns yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}