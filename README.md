# maiia_test_angular

# For development machine
Installing Node.js and NPM installed on your development machine
Installing Angular CLI 10/9
start a live-reload development server using the following commands:
-cd ./maiia_test_angular
-ng serve


# Basic deployment to a remote server
-cd ./maiia_test_angular
-ng build --prod
Copy everything within the output folder (dist/ by default) to a folder on the server

# Server configuration:
Configure the server to redirect requests for missing files to index.html

* Apache: add a rewrite rule to the .htaccess file as shown (https://ngmilk.rocks/2015/03/09/angularjs-html5-mode-or-pretty-urls-on-apache-using-htaccess/):

content_copy
			RewriteEngine On
			# If an existing asset or directory is requested go to it as it is
			RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
			RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
			RewriteRule ^ - [L]

			# If the requested resource doesn't exist, use index.html
			RewriteRule ^ /index.html


* Nginx: use try_files, as described in Front Controller Pattern Web Apps, modified to serve index.html:

content_copy
			try_files $uri $uri/ /index.html;
			
* Ruby: create a Ruby server using (sinatra) with a basic Ruby file that configures the server server.rb:

content_copy
			require 'sinatra'

			# Folder structure
			# .
			# -- server.rb
			# -- public
			#    |-- dist
			#        |-- index.html

			get '/' do
				folderDir = settings.public_folder + '/dist'  # ng build output folder
				send_file File.join(folderDir, 'index.html')
			end
* IIS: add a rewrite rule to web.config, similar to the one shown here:

content_copy
			<system.webServer>
			  <rewrite>
				<rules>
				  <rule name="Angular Routes" stopProcessing="true">
					<match url=".*" />
					<conditions logicalGrouping="MatchAll">
					  <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
					  <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
					</conditions>
					<action type="Rewrite" url="/index.html" />
				  </rule>
				</rules>
			  </rewrite>
			</system.webServer>
* GitHub Pages: you can't directly configure the GitHub Pages server, but you can add a 404 page. Copy index.html into 404.html. It will still be served as the 404 response, but the browser will process that page and load the app properly. It's also a good idea to serve from docs/ on master and to create a .nojekyll file
Firebase hosting: add a rewrite rule.

content_copy
			"rewrites": [ {
			  "source": "**",
			  "destination": "/index.html"
			} ]