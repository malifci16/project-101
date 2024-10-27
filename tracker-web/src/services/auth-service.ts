import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


export interface LoginRepsonse {
  userName: string,
  userId: string;
  jwtToken: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:30001';  // NodePort URL

  constructor(private http: HttpClient, private router: Router) {}

  public login(userName: string | null | undefined, password: string | null | undefined) {
    return this.http.post<LoginRepsonse>(`${this.apiUrl}/budget-tracker/auth/signin`, { userName, password })
      .subscribe((response) => {
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('jwtToken', response.jwtToken);
        localStorage.setItem('name', response.name);
        this.router.navigate(['/dashboard']);
        location.reload();
      }, error => {
        alert(JSON.stringify(error.error.message));
      });
  }

  public signUp(email: string | null | undefined, name: string | null | undefined, userName: string | null | undefined, password: string | null | undefined) {
    return this.http.post<LoginRepsonse>(`${this.apiUrl}/budget-tracker/auth/signup`, { name, email, userName, password })
      .subscribe((response) => {
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('jwtToken', response.jwtToken);
        localStorage.setItem('name', response.name);
        this.router.navigate(['/dashboard']);
        location.reload();
      }, error => {
        alert(JSON.stringify(error.error.message));
      });
  }

  logout() {
    localStorage.clear();
  }
}
