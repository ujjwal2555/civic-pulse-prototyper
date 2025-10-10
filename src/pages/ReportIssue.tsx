import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, MapPin, Mic, Upload, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ReportIssue = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    location: 'Central Avenue, Zone 3',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info('Recording started (demo only)');
      setTimeout(() => {
        setIsRecording(false);
        setFormData(prev => ({
          ...prev,
          description: 'There is a large pothole near the school entrance that needs immediate attention.'
        }));
        toast.success('Voice input captured');
      }, 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Report submitted successfully!', {
      description: 'The municipal team will review your report soon.',
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl">Report a Civic Issue</CardTitle>
            <CardDescription>
              Help us improve your city by reporting issues in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Photo (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                  {previewImage ? (
                    <div className="space-y-4">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewImage(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Camera className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Upload a photo</p>
                          <p className="text-sm text-muted-foreground">
                            Click to browse or drag and drop
                          </p>
                        </div>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="flex-1"
                  />
                  <Button type="button" size="icon" variant="outline">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Auto-detected location</p>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Large pothole on Main Street"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              {/* Issue Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Issue Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pothole">Pothole</SelectItem>
                    <SelectItem value="lighting">Street Lighting</SelectItem>
                    <SelectItem value="waste">Waste Management</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={handleVoiceInput}
                >
                  <Mic className={`h-4 w-4 ${isRecording ? 'text-red-500 animate-pulse' : ''}`} />
                  {isRecording ? 'Recording...' : 'Voice Input'}
                </Button>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 gap-2">
                  <Upload className="h-4 w-4" />
                  Submit Report
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to our terms and conditions
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportIssue;
