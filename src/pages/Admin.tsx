import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

/* 
 * SECURITY WARNING: This is a prototype implementation only!
 * 
 * This admin login uses plaintext passwords stored in the database.
 * Before production deployment, this MUST be replaced with:
 * - Hashed and salted passwords
 * - Secure authentication flows (Supabase Auth, JWTs, etc.)
 * - Proper session management
 * - Rate limiting and brute force protection
 * 
 * Current test credentials:
 * Username: admin
 * Password: password
 */

export default function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }

    // Rate limiting - disable after 3 failed attempts
    if (failedAttempts >= 3) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait before trying again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Query Supabase for admin credentials
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username.trim())
        .limit(1);

      if (error) {
        throw error;
      }

      // Check if admin exists and password matches (plaintext comparison - PROTOTYPE ONLY)
      if (data && data.length === 1 && data[0].password === password) {
        // Success - store session data
        const adminData = { username: data[0].username, loginTime: new Date().toISOString() };
        
        if (rememberMe) {
          localStorage.setItem('lesar_admin', JSON.stringify(adminData));
        } else {
          sessionStorage.setItem('lesar_admin', JSON.stringify(adminData));
        }

        toast({
          title: "Login Successful",
          description: `Welcome back, ${data[0].username}!`,
        });

        // Redirect to home page
        navigate('/');
      } else {
        // Failed login
        setFailedAttempts(prev => prev + 1);
        toast({
          title: "Login Failed",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  // Temporarily disable button after too many failed attempts
  const isButtonDisabled = isLoading || failedAttempts >= 3;

  return (
    <>
      <Helmet>
        <title>Admin Login - Lesar Consults</title>
        <meta name="description" content="Admin login portal for Lesar Consults management system." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card 
          className="w-full max-w-md mx-auto shadow-lg animate-in fade-in-50 slide-in-from-bottom-3 duration-300"
          role="main"
          aria-labelledby="admin-login-title"
        >
          <CardHeader className="space-y-2 text-center">
            <CardTitle id="admin-login-title" className="text-2xl font-bold">
              Admin Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" role="form">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full"
                  aria-required="true"
                  aria-describedby="username-error"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pr-10"
                    aria-required="true"
                    aria-describedby="password-error"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                />
                <Label 
                  htmlFor="remember-me" 
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember me
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isButtonDisabled}
                aria-describedby="submit-button-status"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              {failedAttempts >= 3 && (
                <p className="text-sm text-destructive text-center mt-2">
                  Too many failed attempts. Please wait before trying again.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}