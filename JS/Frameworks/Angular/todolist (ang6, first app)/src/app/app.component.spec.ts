import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { UserComponent } from './components/user/user.component';
import { FilterBySearch } from './filter.pipe';

import mockUsers from './mock/users';

describe('AppComponent', () => {
  const title = 'List of users';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UserComponent,
        FilterBySearch
      ],
      imports: [
        BrowserModule,
        HttpClientModule
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'List of users'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(title);
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(title);
  }));
  it('onChange function', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    const mockText = 'some text';
    const mockEvent =  {
      target: { value: mockText }
    };
    app.onChange(mockEvent);
    expect(app.filter).toEqual(mockText);
  });
  it('should render users', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    app.users = mockUsers;
    fixture.detectChanges();

    let nodeEl = compiled.querySelectorAll('.user');
    expect(nodeEl.length).toBe(4);

    const mockText = 'yur';
    const mockEvent =  {
      target: { value: mockText }
    };
    app.onChange(mockEvent);
    fixture.detectChanges();

    nodeEl = compiled.querySelectorAll('.user');
    expect(nodeEl.length).toBe(2);
  });
});
