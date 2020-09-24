import { Component } from "@angular/core";
import * as download from "downloadjs";
import {
  HttpClient,
  HttpHeaders,
  ResponseContentType
} from "@angular/common/http";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

// https://file-examples.com/index.php/sample-documents-download/sample-pdf-download/
const pdf_url =
  "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";

  constructor(private http: HttpClient) {}

  downloadAndShowPdf() {
    console.log("*** 0", { ResponseContentType });

    let headers = new HttpHeaders();
    headers = headers.set("Accept", "application/pdf");
    return this.http
      .get(pdf_url, {
        headers: headers,
        responseType: "blob"
        //responseType: "arraybuffer"
      })
      .toPromise()
      .then((data) => {
        console.log("** data", data);

        var file = new Blob([data], { type: "application/pdf" });
        //var file = new Blob([data], { type: "application/x-pdf" });

        console.log("** file", file);

        /*
        var myReader = new FileReader();
        myReader.onload = function(event){
            console.log(JSON.stringify(myReader.result));
        };
        myReader.readAsText(file);
        */

        var fileUrl = URL.createObjectURL(file);
        console.log("** file url", fileUrl);
        window.open(fileUrl);

        var link = document.createElement("a");
        link.href = fileUrl;
        link.download = "file.pdf";
        document.body.appendChild(link);
        /*
        link.dispatchEvent(
          new MouseEvent(`click`, {
            bubbles: true,
            cancelable: true,
            view: window
          })
        );
        */
        //link.click();

        console.log("** a", download);
        //download(fileUrl, "dlText.pdf", "application/pdf");
      });
  }
}
