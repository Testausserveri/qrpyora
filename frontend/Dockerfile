FROM arm64v8/httpd:2.4

# Copy React builds
COPY ./public/build/ /usr/local/apache2/htdocs/public/
COPY ./admin/build/ /usr/local/apache2/htdocs/admin/

# Add vhost configurations
RUN sed -i '/.*Include.*httpd-vhosts.*/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/.*LoadModule.*mod_proxy\..*/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/.*LoadModule.*proxy_http.*/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/.*LoadModule.*mod_rewrite.*/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/.*LoadModule.*xml2enc.*/s/^#//g' /usr/local/apache2/conf/httpd.conf
COPY ./vhost.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf

EXPOSE 8080
