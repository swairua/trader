import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, X } from 'lucide-react';
import { useConsent, type ConsentState } from '@/hooks/useConsent';

export function CookieBanner() {
  const { showBanner, consent, acceptAll, rejectAll, saveConsent, hideBanner } = useConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [tempConsent, setTempConsent] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    functional: false,
    necessary: true,
  });

  if (!showBanner) return null;

  const handleSaveSettings = () => {
    saveConsent(tempConsent);
    setShowSettings(false);
  };

  const handleToggle = (key: keyof ConsentState) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setTempConsent(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t">
      <div className="container max-w-6xl mx-auto">
        {!showSettings ? (
          <Card className="p-6 border border-border">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Cookie Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. 
                  You can customize your preferences or accept all cookies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Customize
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={rejectAll}
                >
                  Reject All
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={acceptAll}
                >
                  Accept All
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Cookie Settings</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="font-medium">Necessary Cookies</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Required for basic site functionality. Cannot be disabled.
                  </p>
                </div>
                <Switch checked={true} disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="font-medium">Analytics Cookies</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <Switch
                  checked={tempConsent.analytics}
                  onCheckedChange={() => handleToggle('analytics')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="font-medium">Marketing Cookies</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Used to track visitors across websites for advertising purposes.
                  </p>
                </div>
                <Switch
                  checked={tempConsent.marketing}
                  onCheckedChange={() => handleToggle('marketing')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="font-medium">Functional Cookies</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enable enhanced functionality like live chat and personalization.
                  </p>
                </div>
                <Switch
                  checked={tempConsent.functional}
                  onCheckedChange={() => handleToggle('functional')}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTempConsent({
                    analytics: false,
                    marketing: false,
                    functional: false,
                    necessary: true,
                  });
                  handleSaveSettings();
                }}
                className="flex-1"
              >
                Reject All
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveSettings}
                className="flex-1"
              >
                Save Preferences
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}