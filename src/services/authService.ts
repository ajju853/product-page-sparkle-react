
// Simplified auth service with mock functionality

export interface User {
  id: number;
  email: string;
  name: string;
}

interface StoredUser extends User {
  password: string;
}

// In a real app, use a proper authentication system
// This is a simplified mock for demonstration purposes
export const authService = {
  users: JSON.parse(localStorage.getItem('users') || '[]') as StoredUser[],
  
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null,

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  },

  saveCurrentUser() {
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  },

  register(email: string, password: string, name: string): boolean {
    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      return false;
    }
    
    const newUser = {
      id: Date.now(),
      email,
      password,
      name
    };
    
    this.users.push(newUser);
    this.saveUsers();
    
    // Set current user but omit password
    this.currentUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    };
    this.saveCurrentUser();
    
    return true;
  },
  
  login(email: string, password: string): boolean {
    const user = this.users.find(
      user => user.email === email && user.password === password
    );
    
    if (user) {
      // Set current user but omit password
      this.currentUser = {
        id: user.id,
        email: user.email,
        name: user.name
      };
      this.saveCurrentUser();
      return true;
    }
    
    return false;
  },
  
  logout(): void {
    this.currentUser = null;
    this.saveCurrentUser();
  },
  
  getCurrentUser(): User | null {
    return this.currentUser;
  },
  
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
};
