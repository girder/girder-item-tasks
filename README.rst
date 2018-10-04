Item Tasks
----------

This plugin integrates with the Girder worker and allows items in Girder's data
hierarchy to act as task specifications for the worker. In order to be used as
a task specification, an item must expose two special metadata fields:

* ``isItemTask`` must be set to indicate that this is an item task. The key must
  exist, but the value does not matter.
* ``itemTaskSpec`` must be set to a JSON object representing the worker task
  specification. Documentation of valid worker task specifications can be found in the
  `Girder worker documentation <http://girder-worker.readthedocs.io/en/latest/api-docs.html#the-task-specification>`_.

In order for users to *run* this task, they must be granted a special access
flag granted on the containing folder, namely the **Execute analyses** flag exposed
by this plugin. This special access flag can only be enabled by site administrators
since the capabilities of items as tasks essentially enable arbitrary code execution
on the worker nodes. Because of this power, administrators should be very careful of
who has write access on folders where this permission flag is granted. It is strongly
recommended for security reasons to isolate item tasks in folders separate from normal data,
with minimal access granted to non-administrator users.

Once a user has this special access flag on item tasks, they will see the tasks appear
in the list of available tasks when navigating to the **Tasks** view via the nav bar.
They can also navigate to the item itself and use the **Run this task** option from the
Actions menu. When they do so, they are prompted with an automatically-generated
user interface allowing them to enter inputs to the task and output destinations, and
then execute the task on the worker. The progress, status, and log output of the task
is tracked in real-time via the jobs plugin. The input and output data for each execution
of a task will also appear in that job details view, including links to any Girder data
that was used as inputs or outputs.

Automatic configuration of item tasks via docker
************************************************

.. note:: For security reasons, the capabilities in this section are only available
   to site administrators.

Many item tasks represent algorithms contained in docker images. Such docker images that
implement self-describing behavior can be used to automatically populate an item task's
metadata fields. To auto-populate the task spec, navigate to an existing item that will
be the item task, open the Actions menu, and select **Configure task**. A dialog will
appear prompting the administrator to enter the docker image identifier and also specify any
additional arguments needed to get the description output.

.. note:: Specifying the ``--xml`` argument is not necessary for Slicer Execution Model
   docker task auto-configuration. If not included in the list, it is appended automatically.

Clicking **Run** will start a job on the worker to read the image's description. The
container is expected to write the description to standard output as a
`Slicer Execution Model XML <https://www.slicer.org/wiki/Documentation/Nightly/Developers/SlicerExecutionModel>`_
document. When the job is finished, the task item specification should be set, and
users should now be able to run the task represented by the docker image.

.. note:: The same item task can be auto-configured via docker multiple times without
   causing problems. Different image ids may be used each time if desired.
