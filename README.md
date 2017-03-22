# October CMS site

Docker image includes the latest release of October CMS and it's dependencies.

### Getting Started


__Database & Content__

  Pull the site database, uploaded media and content from the shared repository.

  > Instructions pending for the automated process

__Start Docker__

  ```shell
  $ docker-compose up -d
  ```  

### Environment

 Create `.env` from the provided template `.env.example` and replace the settings as necessary. Environment settings defined here are passed to both docker-compose and October CMS.

 > Database credentials and other sensitive information should not be committed to the repository. Those required settings should be outlined in __.env.example__

 Configuration files for each environment are defined within corresponding folders within  the `/config` folder. These settings will override those defined in the [October CMS base configuration](https://github.com/octobercms/october/tree/master/config).



### Command Line Tasks

  Run artisan and composer tasks within the octobercms container

  ```shell
  $ docker-compose exec octobercms php artisan
  ```

More info:

 * [Docker Compose overview](https://docs.docker.com/compose/overview/)
 * [October CMS console commmands](https://octobercms.com/docs/console/commands)



### Performance

  Unfortunately, bind-mounted volumes are currently quite [slow when traversing large directories under Docker for Mac](https://github.com/docker/for-mac/issues/77). Storing the October CMS core and dependencies in the upstream docker image improve this speed significantly. However, ~1000ms can be shaved off page loads when the `/plugins` and `/themes` folders are not mounted.

 __Looking for faster page loads in development?__
 <br>
 Comment out volumes in the Docker Compose file that aren't actively being worked on.


### Troubleshooting
 * Fix time drift caused by putting your Mac to sleep - `docker run --rm --privileged alpine hwclock -s`
 * Fix [Docker Compose is slow to start on Docker Mac beta]
(https://github.com/docker/compose/issues/3419#issuecomment-221793401)
 * See [Known Issues](https://docs.docker.com/docker-for-mac/troubleshoot/#/known-issues) for Docker for Mac
