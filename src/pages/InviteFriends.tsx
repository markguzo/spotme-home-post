import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, QrCode, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const InviteFriends = () => {
  const navigate = useNavigate();

  const shareInvite = () => {
    toast({ title: "Invite link copied! 🔗" });
  };

  const showQR = () => {
    toast({ title: "QR code generated! 📱" });
  };

  const shareContacts = () => {
    toast({ title: "Opening contacts..." });
  };

  const invitedFriends = [
    { name: "Alex M.", status: "Joined ✓", date: "2 days ago" },
    { name: "Jordan P.", status: "Pending", date: "1 week ago" },
    { name: "Sam K.", status: "Joined ✓", date: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate("/home")} className="text-foreground">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Invite Friends</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Badge Progress */}
        <div className="bg-primary/20 p-6 rounded-2xl border border-primary/30 text-center space-y-3">
          <div className="text-5xl">🤝</div>
          <p className="text-foreground font-semibold text-lg">Team Player Badge</p>
          <p className="text-muted-foreground text-sm">
            Earn this badge when 5 friends join SpotMe
          </p>
          <div className="bg-muted/50 rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-full w-3/5 rounded-full"></div>
          </div>
          <p className="text-primary text-sm font-medium">3 / 5 friends joined</p>
        </div>

        {/* Invite Buttons */}
        <div className="space-y-3">
          <Button
            onClick={shareInvite}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-14 text-base font-medium"
          >
            <Share2 className="mr-2" size={20} />
            Share Invite Link
          </Button>

          <Button
            onClick={showQR}
            className="w-full bg-card hover:bg-muted text-foreground border border-border rounded-full h-14 text-base font-medium"
          >
            <QrCode className="mr-2" size={20} />
            Show QR Code
          </Button>

          <Button
            onClick={shareContacts}
            className="w-full bg-card hover:bg-muted text-foreground border border-border rounded-full h-14 text-base font-medium"
          >
            <Users className="mr-2" size={20} />
            Share via Contacts
          </Button>
        </div>

        {/* Invited Friends List */}
        <div className="space-y-3">
          <h3 className="text-foreground font-semibold">Friends Invited</h3>
          <div className="space-y-2">
            {invitedFriends.map((friend, idx) => (
              <div
                key={idx}
                className="bg-card p-4 rounded-xl flex items-center justify-between"
              >
                <div>
                  <p className="text-foreground font-medium">{friend.name}</p>
                  <p className="text-muted-foreground text-sm">{friend.date}</p>
                </div>
                <span
                  className={`text-sm ${
                    friend.status.includes("Joined")
                      ? "text-success"
                      : "text-muted-foreground"
                  }`}
                >
                  {friend.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
