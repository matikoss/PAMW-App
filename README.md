# PAMW-App
Projekt realizowany w ramach laboratorium z przedmiotu "Programowanie aplikacji mobilnych i webowych".

## Uruchomienie dla etapu 1:
Wchodzimy do katalogu PAMW-App i w nim wykonujemy polecenie:
#docker-compose up --build

Po uruchomieniu kontenera formularz rejestracyjny będzie dostępny pod adresem http://localhost:8000.
Serwer z którym się komunikuje uruchamia się pod adresem http://localhost:3000.
Ważne jest żeby porty 8000 i 3000 były wolne.
Dane testowego użytkownika znajdujące się domyślnie na serwerze:
#### username: testowyUzytkownik
#### email: testowy@mail.com
#### password: testowe123
Dla tych danych lub dla innych powtarzających się rejestracja nowego użytkownika powinna zostać odrzucona. 
Pod adresem http://localhost:3000/ serwer zwraca zawartość pseudo bazy danych serwera w postaci pliku JSON.
